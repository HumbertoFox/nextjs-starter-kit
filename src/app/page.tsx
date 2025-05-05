import { auth } from '@/auth';
import HomeFooterComponent from '@/components/home-footer';
import HomeMainComponent from '@/components/home-main';
import Link from 'next/link';

export default async function Home() {
  const session = await auth();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-[1440px]">
        <nav className="flex items-center justify-end gap-4">
          {session?.user ? (
            <Link
              href="dashboard"
              className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="login"
                className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
              >
                Log in
              </Link>
              <Link
                href="register"
                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </header>
      <HomeMainComponent />
      <HomeFooterComponent />
    </div>
  );
}