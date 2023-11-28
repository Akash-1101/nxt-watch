import {formatDistanceToNow} from 'date-fns'
import './index.css'

const VedioItem = props => {
  const {data} = props
  const {id, title, thumbnailUrl, channel, viewCount, publishedAt} = data
  const {name, profileImageUrl} = channel
  const year = formatDistanceToNow(new Date(publishedAt))
  const a = year.split(' ')
  const b = a[1] + a[2]

  return (
    <li className="vedio-item-container">
      <img alt="video thumbnail" className="thumnail-img" src={thumbnailUrl} />
      <div className="thumbnail-below-container">
        <img alt="channel logo" className="profile-img" src={profileImageUrl} />
        <div>
          <p>{title}</p>
          <p>{name}</p>
          <div className="views-contaiiner">
            <p>{viewCount}</p>
            <p>views </p>
            <p>{b}</p>
            <p>{publishedAt}</p>
            <p> ago</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default VedioItem
