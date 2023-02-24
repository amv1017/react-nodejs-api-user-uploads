import { getAge } from '../util'
import { IUser } from './IUser'

const API_URL = import.meta.env.VITE_API_URL

const Card = (props: IUser) => {
  const { id, name, birthday, image } = props
  return (
    <div className="card">
      <img src={`${API_URL.replace('api', '')}${image}`} />
      <b>{name}</b>
      <p>{getAge(birthday)}</p>
    </div>
  )
}

export default Card
