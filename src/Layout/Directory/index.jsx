import { useEffect } from "react";
import { Container, Typography } from "@mui/material";
import DirectoryList from "../../components/DirectoryList";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, fetchAllPosts } from "../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";

function Directory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // getting data from redux store
  const users = useSelector((state) => state.user.users);
  const AllPost = useSelector((state) => state.user.allPosts);

  useEffect(() => {
    // it will prevent api call if there is data in reducer
    if (!users?.length) {
      dispatch(fetchUsers());
      dispatch(fetchAllPosts());
    }
  }, []);

  const onUserListClickHandler = (data) => {
    navigate(`Profile/${data?.id}`);
  };

  // filtering the user post from all post and  time complexity of this function is o(n)
  function getUserPostCounts(posts) {
    const postCounts = {};
    for (let i = 0; i < posts.length; i++) {
      const userId = posts[i].userId;
      if (!postCounts[userId]) {
        postCounts[userId] = 1;
      } else {
        postCounts[userId]++;
      }
    }
    return postCounts;
  }
 
  const userPostCounts = getUserPostCounts(AllPost);

  return (
    <Container maxWidth="md" className="Container">
      <div className="Directory_Content">
        <Typography variant="h1" align="center">
          Teachmint Directory
        </Typography>
        <div className="directoryList_conatiner">
          {users?.map((item, index) => {
            return (
              <DirectoryList
                key={index}
                data={item}
                postCount={userPostCounts[item.id] || 0}
                onUserListClickHandler={() => onUserListClickHandler(item)}
              />
            );
          })}
        </div>
      </div>
    </Container>
  );
}

export default Directory;
