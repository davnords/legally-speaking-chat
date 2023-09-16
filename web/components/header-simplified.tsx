import * as React from 'react'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Sidebar } from '@/components/sidebar'
import {
    IconSeparator
} from '@/components/ui/icons'
import { SidebarFooter } from '@/components/sidebar-footer'
import ThemeToggler from './themetoggler'

export async function Header() {
    return (
        <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
            <div className="flex items-center justify-end space-x-2">
                <ThemeToggler />
                <IconSeparator className="w-6 h-6 text-muted-foreground/50" />
                <a href='/'>Start</a>
                <IconSeparator className="w-6 h-6 text-muted-foreground/50" />
                <a href='/about'>About</a>
                <IconSeparator className="w-6 h-6 text-muted-foreground/50" />
                <a href='/news'>News</a>
                <IconSeparator className="w-6 h-6 text-muted-foreground/50" />
                <a href='/admin'>Admin</a>
            </div>
            <div className="flex items-center justify-end space-x-2">
                <a
                    href="/contact"
                    className={cn(buttonVariants())}
                >
                    <span className="hidden sm:block">Deploy to your own website</span>
                    <span className="sm:hidden">Deploy</span>
                </a>
            </div>
        </header>
    )
}
