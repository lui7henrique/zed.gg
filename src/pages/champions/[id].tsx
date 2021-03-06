import { DefaultLayout } from "layouts/Default"
import { datadragon } from "services/datadragon"
import { merakianalytics } from "services/merakianalytics"
import { ChampionTemplate } from "templates/Champion"
import { ChampionType } from "types/champion"
import { addZeros } from "utils/champion/FormatChampionKey"
import { formatSpellByIndex } from "utils/champion/FormatSpellByIndex"

type IChampionProps = {
  champion: ChampionType
}

export default function Champion({ champion }: IChampionProps) {
  return (
    <>
      <DefaultLayout title={champion.name} description={champion.blurb}>
        <ChampionTemplate champion={champion} />
      </DefaultLayout>
    </>
  )
}

export async function getStaticProps({ params }: any) {
  const { id } = params

  const { data: responseData } = await datadragon.get(`/champion/${id}.json`)
  const data: any = Object.values(responseData.data)[0]

  const { skins } = await (
    await merakianalytics.get(`/champions/${id}.json`)
  ).data

  const champion = {
    id: data.id,
    key: data.key,
    name: data.name,
    title: data.title,
    lore: data.lore,
    blurb: data.blurb,
    allytips: data.allytips,
    enemytips: data.enemytips,
    tags: data.tags,
    info: data.info,
    stats: data.stats,
    icon: `https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-tiles/${data.key}/${data.key}000.jpg`,
    splash_art_full: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${data.name}_0.jpg`,
    splash_art_cropped: `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/${data.key}/${data.key}000.jpg`,

    skins: data.skins.map((skin: any, index: number) => {
      if (data.id !== "Seraphine") {
        return {
          id: skin.id,
          num: skin.num,
          name: skin.name === "default" ? "Padrão" : skin.name,
          splash_art_full: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${data.id}_${skin.num}.jpg`,
          splash_art_cropped: skins[index].splashPath,
          icon: skins[index].tilePath,
          loadscreen: skins[index].loadScreenPath,
          rarity: skins[index].rarity,
          cost: skins[index].cost
        }
      } else {
        return {
          id: skin.id,
          num: skin.num,
          name: skin.name === "default" ? "Padrão" : skin.name,
          splash_art_full: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${data.id}_${skin.num}.jpg`
        }
      }
    }),

    spells: data.spells.map((spell: any, index: number) => {
      return {
        id: spell.id,
        name: spell.name,
        description: spell.description,
        image: `http://ddragon.leagueoflegends.com/cdn/11.13.1/img/spell/${spell.image.full}`,
        video: `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${addZeros(
          data.key,
          4
        )}/ability_${addZeros(data.key, 4)}_${formatSpellByIndex(index)}1.mp4`
      }
    }),

    passive: {
      name: data.passive.name,
      description: data.passive.description,
      image: `http://ddragon.leagueoflegends.com/cdn/11.13.1/img/passive/${data.passive.image.full}`,
      video: `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${addZeros(
        data.key,
        4
      )}/ability_${addZeros(data.key, 4)}_P1.mp4`
    }
  }

  return {
    props: {
      champion
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}

// to generate static pages
export async function getStaticPaths() {
  const { data } = await datadragon.get("/champion.json")
  const champions = Object.keys(data.data)

  const paths = champions.map((champion) => ({
    params: { id: champion }
  }))

  return {
    paths,
    fallback: "blocking"
  }
}
