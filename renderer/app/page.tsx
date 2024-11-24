"use client";
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
function IndexPage() {
  const router = useRouter()

  React.useEffect(() => {

    router.push("/painel")

  }, [])
  return (
    <main className="flex flex-col items-center gap-2 pt-10">
      <Image
        priority
        src="/images/logo.png"
        alt="logo"
        width={150}
        height={150}
      />
      <h1 className="text-lg font-semibold">
        Nextron ( Next.Js + Electron ) Boilerplate
      </h1>
      <p>With TypeScript, TailwindCSS and Shadcn/ui</p>
      <p>Crossbuild for Web or Desktop</p>
      <Button onClick={() => {

        window.electronAPI.send("ipc-example", { "data": 2 })
      }}>Nova conexao</Button>
    </main>
  )
}

export default IndexPage
