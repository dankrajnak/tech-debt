import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetLanguagesInput
  extends Pick<Prisma.LanguageFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  async ({ where, orderBy, skip = 0, take = 100 }: GetLanguagesInput) => {
    const {
      items: languages,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.language.count({ where }),
      query: (paginateArgs) => db.language.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      languages,
      nextPage,
      hasMore,
      count,
    }
  }
)
