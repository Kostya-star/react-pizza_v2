import React from "react"
import ContentLoader from "react-content-loader"


const Skeleton: React.FC = () => (
  <ContentLoader 
    className='pizza-block'
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ebebea"
  >
    <circle cx="138" cy="120" r="114" /> 
    <rect x="235" y="149" rx="0" ry="0" width="7" height="1" /> 
    <rect x="1" y="317" rx="5" ry="5" width="274" height="86" /> 
    <rect x="4" y="434" rx="0" ry="0" width="90" height="27" /> 
    <rect x="130" y="422" rx="10" ry="10" width="139" height="41" /> 
    <rect x="7" y="262" rx="10" ry="10" width="258" height="27" />
  </ContentLoader>
)

export default Skeleton