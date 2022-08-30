import React from 'react';
import {  useCallback, useEffect, useState } from 'react';
import './styles.css';
import { Posts } from '../../components/Posts';
import {loadPosts} from '../../Utils/load-posts'
import { Button } from '../../components/Button';
import TextInput from '../../components/TextInput';

 const Home = () =>{


  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState([0]);
  const [postPerPage] = useState([10]);
  const [searchValue, setSearchValue] = useState('');

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(() => {
    console.log(new Date().toLocaleString('pt-BR'));
    handleLoadPosts(0, postPerPage);
  }, [handleLoadPosts, postPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  }

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  }

  const noMorePosts = page + postPerPage >= allPosts.length;
  const filteredPosts = searchValue?
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase()
      );
    })
    : posts;

  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && (
          <h1>Search value: {searchValue}</h1>
     )}
 
   <TextInput searchValue={searchValue}
    handleChange ={handleChange} />
    </div>
   <br/><br/>

     {filteredPosts.length > 0 && (
      <Posts posts={filteredPosts}/>
     )}

      {filteredPosts.length === 0 && (
          <h3>Not Found</h3>
     )}
    
    <div  className="button-container">
      {!searchValue &&(
         <Button text="load more posts"
         onClick={loadMorePosts}
         disabled={noMorePosts}
         />
      )}
    </div>
  </section>

  );
      };

      export default Home;

  
 