import React from 'react'
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

 const About = ({ location }) => {
  return (
    <Layout location={location}>
      <div>about</div>
    </Layout>
  )
}

export default About
