import { Search } from "@styled-icons/boxicons-regular"
import { useRouter } from "next/dist/client/router"
import { useState } from "react"

import * as S from "./styles"

export function HomeTemplate() {
  const [summoner, setSummoner] = useState("")

  const router = useRouter()

  function handleSubmitSearch(e: React.FormEvent) {
    e.preventDefault()
    {
      summoner.length >= 3 && router.push(`/summoner/${summoner}`)
    }
  }

  return (
    <S.Container>
      <S.ImageWrapper>
        <S.ImageContainer>
          <div>
            <form onSubmit={handleSubmitSearch}>
              <input
                type="text"
                placeholder="Buscar pelo nome de usuário"
                onChange={(e) => setSummoner(e.target.value)}
              />
              <button type="submit">
                <Search size={25} color={"white"} />
              </button>
            </form>
          </div>
        </S.ImageContainer>
      </S.ImageWrapper>
    </S.Container>
  )
}
