import React, { useState } from 'react'
import Layout from '../components/layout';
import { graphql, Link } from "gatsby";
import parse from "html-react-parser"
import { url_config } from '../config';
import  NewsLetterForm  from '../components/NewsletterForm';
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const ContentLayout = ({ location, data, loading, error }) => {
    const { allWpPost: { edges }} = data;
    console.log(edges)

  return (
    <Layout location={location}>
       <section className='content_wrapper'>
        <article className='article_content_container'>
            {edges?.map((post, idx)=>{
                return(
                    <Link to={`${url_config.base_url}/${post?.node?.slug}`} key={post?.node?.id}>
                    <div className='main_content_section' key={post?.node?.id}>
                            <div className='content_section'>
                                <picture>
                                <img src={post?.node?.featuredImage?.node?.sourceUrl} alt={post?.node?.title}/>
                                </picture>
                                <div className='right_inside_content_section'>
                                    <h4>{post?.node?.author?.node?.name}</h4>
                                    <h1>{post?.node?.title}</h1>
                                    <p>{post?.node?.date}</p>
                                </div>
                            </div>
                        <div className='excerpt'>
                            {parse(post?.node?.excerpt)}
                        </div>
                        <Link to={`${url_config.base_url}/${post?.node?.slug}`}>Continue reading ↬</Link>
                    </div>
                    </Link>
                )
            })}
        </article>
        <NewsLetterForm />
       </section>
    </Layout>
  )
}

export const query = graphql`
  {
    allWpPost(limit: 2) {
        edges {
          node {
            id
            excerpt
            title
            date(formatString: "MMM Do YYYY")
            slug
            featuredImage {
              node {
                sourceUrl
                altText
                localFile {
                  id
                }
              }
            }
            author {
              node {
                id
                name
              }
            }
          }
        }
      }
  }
`

export default ContentLayout