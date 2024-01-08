import { lazy } from 'react'
import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  Link,
  ActionFunctionArgs,
} from 'react-router-dom'
import Root, { loader as rootLoader } from '@/components/Root'
import ErrorPage from '@/error-page'
import Contact from '@/view/Contact'
import SignUp, { action as signUpAction } from '@/view/UseActionData'
import UseFetcher from '@/view/UseFetcher'
const TodoList = lazy(() => import('@/view/TodoList'))

// LazyRouteFunction<RouteObject>
export const routes: Array<RouteObject> = [
  {
    path: '/',
    // errorElement: <ErrorPage></ErrorPage>,
    ErrorBoundary: ErrorPage,
    element: <Navigate to='/contacts'></Navigate>,
  },
  {
    path: '/',
    element: <Root />,
    loader: rootLoader,
    lazy: () => rootLoader(),
    handle: {
      crumb: () => <Link to='/contacts'>Messages</Link>,
    },
    shouldRevalidate: (args) => {
      console.log(args, '---args---')
      return args.currentParams.id === '1'
    },
    children: [
      {
        path: 'contacts/:id?',
        // element: <Contact></Contact>,
        Component: Contact,
        index: true,

        handle: {
          crumb: () => 'name',
          // crumb: (data: any) => <span>{data.threadName}</span>,
        },
      },
      {
        path: 'todoList',
        Component: TodoList,
        action: async ({ request, params }: ActionFunctionArgs) => {
          let formData = await request.formData()
          console.log(
            formData.get('action'),
            params,
            formData.keys(),
            request,
            '------------'
          )
          if (formData.get('action') === 'delete') {
            console.log('------post------')
            // let id = formData.get("todoId");
            // if (typeof id === "string") {
            //   // deleteTodo(id);
            //   return { ok: true };
            // }
          }
          return {}
        },
      },
      {
        path: '/signUp',
        Component: SignUp,
        action: signUpAction,
      },
      {
        path: '/useFetcher',
        element: <UseFetcher id='0001' todo='todo'></UseFetcher>,
        // action: signUpAction
      },
    ],
  },
]

export const router = createBrowserRouter(routes)
