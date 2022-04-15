import React, { useEffect } from "react";
import PostsContainer from "../../../features/PostContainer/PostsContainer";
import { Reddit } from "../../../utility/reddit";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getInfo, selectSubredditName } from "./SubredditPageSlice";
import { identityFetch } from "../../../features/Navbar/NavbarSlice";
import { postsFetch } from "../../../features/PostContainer/PostsContainerSlice";
import AboutSubreddit from "../../../features/AboutSubreddit/AboutSubreddit";

const SubredditPage = () => {
  let params = useParams();
  let subredditFullName = localStorage.getItem("subredditFullName");
  //action
  const action = useDispatch();
  
  //state
  const subredditName = useSelector(selectSubredditName);


  //handle event
  useEffect( () => {
    action(getInfo(subredditFullName));
  })
  useEffect(() => {
    Reddit.getRefreshToken(
    ).then(() => {
      action(identityFetch());
    }).then(() => {
      action(postsFetch({path: 'hot', lastElement: null, firstElement: null, subreddit: params.subredditId}));
    });
  })


  return (
    <main id="subreddit-page">
      <h1 id="subreddit-name">
        {subredditName}
      </h1>
      <AboutSubreddit />
      <PostsContainer subreddit={subredditFullName} />
      {/* need to add fullname of subreddit */}
    </main>
  )
}

export default SubredditPage;
