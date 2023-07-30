import { FC, PropsWithChildren } from 'react';
import Head from 'next/head'
import { Navbar, SideMenu } from '../ui';

interface Props {
    title: string;
    pageDescription: string;
    imageFullUrl?: string;
}

export const ShopLayout: FC<PropsWithChildren<Props>> = ({ children, title, pageDescription, imageFullUrl }) => {
    return (
        <>
            <Head>
                <title>{ title }</title>

                <meta name="descripcion" content={ pageDescription } />

                <meta name="og:title" content={ title } />
                <meta name="og:descripcion" content={ pageDescription } />

                {
                    imageFullUrl && (
                        <meta name="og:image" content={ imageFullUrl } />
                    )
                }

            </Head>

            <nav>
                {/* TODO: Navbar */  }
                <Navbar />
            </nav>

            {/* TODO: Sidebar */  }
            <SideMenu />
            
            <main style={{
                margin: '80px auto',
                maxWidth: '1440px',
                padding: '0px 30px'
            }}>
                { children }
            </main>

            <footer>
                {/* TODO: Footer */  }
            </footer>

        </>
    )
}


