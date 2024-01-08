import { FC, useState } from 'react'
import { Outlet, Link, useLoaderData, useMatches } from 'react-router-dom'
import { getContacts } from '@/contacts'
function Breadcrumbs() {
  let matches = useMatches() as any
  console.log(matches)
  let crumbs = matches.filter((match: any) => Boolean(match.handle?.crumb)).map((match: any) => match.handle.crumb(match.data))
  return (
    <ol>
      {crumbs.map((crumb: any, index: number) => (
        <li key={index}>{crumb}</li>
      ))}
    </ol>
  )
}

/**
 * 当前路由用到的 loader
 */
export const loader = async () => {
  // const [loading, setLoading ] = useState<boolean>(true);
  console.log('root loader')
  return await getContacts()
  // return new Promise( (resolve, reject) => {
  //   setTimeout( () => {
  //     resolve({
  //       name: 'lantian',
  //       sex: '男'
  //     });
  //     console.log( 'root can render' );
  //     // setLoading( false )
  //   }, 1000 );
  // })
}

const Root = () => {
  const matchs = useMatches()
  const list = useLoaderData() as Array<any>

  console.log(matchs, list, '---matchs---')

  return (
    <>
      {/*  */}
      <div id='sidebar'>
        <Breadcrumbs></Breadcrumbs>
        <h1>React Router Contacts</h1>
        <div>
          <form id='search-form' role='search'>
            <input id='q' aria-label='Search contacts' placeholder='Search' type='search' name='q' />
            <div id='search-spinner' aria-hidden hidden={true} />
            <div className='sr-only' aria-live='polite'></div>
          </form>
          <form method='post'>
            <button type='submit'>New</button>
          </form>
        </div>
        <nav>
          <ul>
            <li>
              <Link to='/contacts/1'>Your Name</Link>
              {/* <a href={`/contacts/1`}>Your Name</a> */}
            </li>
            <li>
              <Link to='/contacts/2'>Your Friend</Link>
              {/* <a href={`/contacts/2`}>Your Friend</a> */}
            </li>
            <li>
              <a href={`/contacts`}>not id</a>
            </li>
          </ul>
        </nav>
      </div>
      <div id='detail'>
        <Outlet></Outlet>
      </div>
    </>
  )
}

export default Root
