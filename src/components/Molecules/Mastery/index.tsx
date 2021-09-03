import { ImageWrapper } from "components/Atoms/ImageWrapper"
import Image from "next/image"
import { Mastery as MasteryType } from "types/summoner"

import * as S from "./styles"

interface IMasteryProps {
  mastery: MasteryType
}

export function Mastery({ mastery }: IMasteryProps) {
  return (
    <S.Container>
      <ImageWrapper
        icon={mastery.icon}
        size={50}
        mastery_level={mastery.level}
      />
      <S.MasteryInfos>
        <section>
          <h4>{mastery.name}</h4>
          <sub>
            <Image
              src="/img/mastery.png"
              alt="Icon mastery"
              width={20}
              height={20}
            />
            {mastery.points.toLocaleString("pt-BR")}
          </sub>
          {/* <span>{mastery.lastPlayTime}</span> */}
        </section>
        {mastery.chestGranted && <S.Chest />}
      </S.MasteryInfos>
    </S.Container>
  )
}