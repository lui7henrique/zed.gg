import { GetServerSideProps } from "next"
import { NextSeo } from "next-seo"
import { americas } from "services/americas"
import { api } from "services/riot"
import { SummonerTemplate } from "templates/Summoner"
import {
  SummonerProps,
  UnformattedMastery,
  UnformattedRank
} from "types/summoner"
import { formatMasteries } from "utils/summoner/formatMasteries"
import { FormatMatch } from "utils/summoner/FormatMatch"
import { formatRanks } from "utils/summoner/formatRanks"

import { DefaultLayout } from "../../layouts/Default"

export default function Summoner({
  summoner,
  matchHistory,
  masteries,
  ranks
}: SummonerProps) {
  return (
    <>
      <NextSeo
        title={summoner.nick}
        description={`Explore informações sobre ${summoner.nick}, como histórico, maestrias, elo, e muito mais! 🤗`}
        canonical={`https://fiora.vercel.app/summoner/${summoner.nick}`}
        openGraph={{
          url: `https://fiora.vercel.app/summoner/${summoner.nick}`,
          title: summoner.nick,
          description: `Explore informações sobre ${summoner.nick}, como histórico, maestrias, elo, e muito mais! 🤗`,
          images: [
            {
              url: "https://picsum.photos/1920/1080",
              width: 1280,
              height: 720,
              alt: summoner.nick
            }
          ]
        }}
      />
      <DefaultLayout title="Invocador" description="Invocador" hasLimiter>
        <SummonerTemplate
          summoner={summoner}
          matchHistory={matchHistory}
          masteries={masteries}
          ranks={ranks}
        />
      </DefaultLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const nick = (ctx.query.nick as String).toLowerCase()

  try {
    const { data: dataSummoner } = await api.get(
      `/summoner/v4/summoners/by-name/${nick}`
    )

    const summoner = {
      id: dataSummoner.id,
      puuid: dataSummoner.puuid,
      accountId: dataSummoner.accountId,
      nick: dataSummoner.name,
      level: dataSummoner.summonerLevel,
      icon: `http://ddragon.leagueoflegends.com/cdn/11.14.1/img/profileicon/${dataSummoner.profileIconId}.png`
    }

    const { data: dataMatch } = await americas.get<Array<string>>(
      `/match/v5/matches/by-puuid/${summoner.puuid}/ids`,
      {
        params: {
          count: 10
        }
      }
    )

    const matchHistory = await Promise.all(
      dataMatch.map(async (match) => {
        const { data } = await americas.get(`/match/v5/matches/${match}`)
        return FormatMatch(summoner.nick, data)
      })
    )

    const { data: dataMasteries }: { data: UnformattedMastery[] } =
      await api.get(
        `/champion-mastery/v4/champion-masteries/by-summoner/${summoner.id}`
      )

    const masteries = formatMasteries(dataMasteries)

    const { data: DataRank }: { data: UnformattedRank[] } = await api.get(
      `/league/v4/entries/by-summoner/${summoner.id}`
    )
    const ranks = formatRanks(DataRank)

    return {
      props: {
        summoner,
        matchHistory,
        masteries,
        ranks
      }
    }
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: "/"
      },
      props: {}
    }
  }
}
