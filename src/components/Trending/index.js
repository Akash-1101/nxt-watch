import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import {MdVideoLibrary, MdCancel} from 'react-icons/md'
import {IoMdHome, IoIosSearch} from 'react-icons/io'
import {FaFire} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import {SiYoutubegaming} from 'react-icons/si'
import Header from '../Header'
import VedioItem from '../VedioItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class Trending extends Component {
  state = {
    vediosList: [],
    apiStatus: apiStatusConstants.initial,
    activeTabId: 'Home',
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/videos/trending`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = fetchedData.videos.map(each => ({
        id: each.id,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        channel: {
          name: each.channel.name,
          profileImageUrl: each.channel.profile_image_url,
        },
        viewCount: each.view_count,
        publishedAt: each.published_at,
      }))
      this.setState({
        vediosList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onclickTab = () => {
    this.setState({})
  }

  renderVediosView = () => {
    const {vediosList} = this.state
    return (
      <ul className="vedioListContainer">
        {vediosList.map(each => (
          <VedioItem key={each.id} data={each} />
        ))}
      </ul>
    )
  }

  onClickRetry = () => {
    this.setState({searchInput: ''}, this.getDetails)
  }

  renderNoResultView = () => (
    <div className="noResultContainer">
      <img
        className="no-res-img"
        alt="no videos"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
      />
      <h1>No Search results found</h1>
      <p>Try different key words or remove search filter</p>
      <button onClick={this.onClickRetry} className="Retry-btn">
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="noResultContainer">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  renderVedios = () => {
    const {vediosList, apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderNoResultView()
      case apiStatusConstants.success:
        if (vediosList.length === 0) {
          return this.renderNoResultView()
        }
        return this.renderVediosView()
      default:
        return null
    }
  }

  onSearch = () => {
    this.getDetails()
  }

  render() {
    const {vediosList, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="home-container">
        <Header />
        <div className="home-page-second-container">
          <div className="home-lg-left-container">
            <ul>
              <Link to="/" className="home-page-items-lg-container">
                <IoMdHome className="icon1" />
                <p>Home</p>
              </Link>
              <Link to="/trending" className="home-page-items-lg-container">
                <FaFire className="icon1" />
                <p>Trending</p>
              </Link>
              <Link to="/gaming" className="home-page-items-lg-container">
                <SiYoutubegaming className="icon1" />
                <p>Gaming</p>
              </Link>
              <Link to="/saved-videos" className="home-page-items-lg-container">
                <MdVideoLibrary className="icon1" />
                <p>Saved videos</p>
              </Link>
            </ul>
            <div>
              <p>Contact Us</p>
              <div>
                <img
                  alt="facebook logo"
                  className="facebook-logo-img"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                />
                <img
                  alt="twitter logo"
                  className="facebook-logo-img"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                />
                <img
                  alt="linked in logo"
                  className="facebook-logo-img"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                />
              </div>
              <p>Enjoy! Now to see your channels and recommendations!</p>
            </div>
          </div>
          <div className="home-lg-right-container">
            <div className="trending-lg-mini-right-container">
              <FaFire className="icon2" />
              <h1>Trending</h1>
            </div>
            {this.renderVedios()}
          </div>
        </div>
      </div>
    )
  }
}

export default Trending
