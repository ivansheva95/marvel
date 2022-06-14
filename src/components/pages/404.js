import { Link } from "react-router-dom"
import { ErrorMessage } from "../errorMessage/ErrorMessage"

const Page404 = () => {
  return (
    <>
      <ErrorMessage />
      <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Page doesn't exist</p>
      <Link to='/' style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Back to min page</Link>
    </>
  )
}

export default Page404