import { notFound, redirect } from 'next/navigation'
import { auth } from '@/auth'
export const runtime = 'edge'

export default async function HomePage() {

    const session = await auth()

    if (!session?.user) {
        redirect(`/sign-in`)
    } else {
        redirect(`/chat`)
    }
}
