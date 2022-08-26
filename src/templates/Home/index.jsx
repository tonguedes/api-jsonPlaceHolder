
import { Component } from 'react';
import './styles.css';
import { Posts } from '../../components/Posts';
import {loadPosts} from '../../Utils/load-posts'
import { Button } from '../../components/Button';
import TextInput from '../../components/TextInput';

class Home extends Component {
  state = {
    
    posts: [],
    allPosts: [],
    page: 0,
    postPerPage: 3,
    searchValue: ''
     
  };

   async componentDidMount(){
    await this.loadPosts();
  }

  loadPosts = async () => {
    const{page, postPerPage} = this.state;
     const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postPerPage),
      allPosts: postsAndPhotos,
    });
  }

  loadMorePosts = () =>{
    const{
      page,
      postPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postPerPage;
    const nextPosts = allPosts.slice(nextPage,nextPage + postPerPage)
    //spread operator
    posts.push(...nextPosts);

    this.setState({posts, page: nextPage})
  }

  handleChange = (e) =>{
     const {value} = e.target;
     this.setState({searchValue: value})
  }


  handleTimeOut =()=>{
    const { posts,  } = this.state;
    posts[0].title = 'o titulo mudou'
    setTimeout(()=>{
      this.setState({posts, })
    },);

  }

  render() {
    const { posts,page,postPerPage,allPosts,searchValue} = this.state;
    const noMorePosts = page + postPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ? 
     posts.filter(post =>{
        return post.title.toLowerCase().includes
        (searchValue.toLowerCase());
     })
     :
      posts;

    return (
      <section className='container'>
        <div className="search-container">
        {!!searchValue && (
          <>
        <h1>search value: {searchValue} </h1>
          </>
        )}
       
       <TextInput searchValue={searchValue}
        handleChange ={this.handleChange} />
        </div>
       <br/><br/>

         {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts}/>
         )}

          {filteredPosts.length === 0 && (
              <p>Not Found</p>
         )}
        
        <div  className="button-container">
          {!searchValue &&(
             <Button text="load more posts"
             onClick={this.loadMorePosts}
             disabled={noMorePosts}
             />
          )}
        </div>
      </section>
    
    );
  }};

  export default Home;