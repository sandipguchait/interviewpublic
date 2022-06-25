import React, { useState, useEffect, useCallback } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { url_config } from '../../config';
import default_blog_image from '../../../public/icons/default-blog.png';

const SearchResults = ({ searchTerm }) => {
  const [searchedPostData, setSearchedPostData] = useState([]);

  const {allWpPost : { edges }} = useStaticQuery(graphql`
  query fetchAllPosts {
    allWpPost {
      edges {
        node {
          id
          title
          slug
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  }
`)

    //filter post based on search query
    const searchPost = useCallback(() => {
      const filteredPosts = edges.filter(post => {
        return post.node.title.toLowerCase().includes(searchTerm.toLowerCase())
      }) 
      setSearchedPostData(filteredPosts);
    },[edges, searchTerm])

  useEffect(() => {
    if(searchTerm) {
      searchPost();
    }
    return () => setSearchedPostData([])
  },[searchTerm, searchPost])

 

  return (
    <div className='search_results_wrapper'>
      {searchedPostData.length > 0 && searchedPostData.map(post=>{
        return(
          <Link target="_blank" to={`${url_config.base_url}/${post?.node?.slug}`}  key={post?.node?.id}>
            <div className='search_results_cards' key={post?.node?.id}>
                <img 
                  src={post?.node?.featuredImage?.node?.sourceUrl || default_blog_image } 
                  alt={post?.node?.title}
                  />
              <div className='search_results_cards_right'>
                <h1>{post?.node?.title}</h1>
                <Link to={`${url_config.base_url}/${post?.node?.slug}`}>{`${url_config.base_url}/${post?.node?.slug}`}</Link>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}


export default React.memo(SearchResults)