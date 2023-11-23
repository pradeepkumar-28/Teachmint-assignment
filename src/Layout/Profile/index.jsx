import { useEffect, useState } from "react";
import { Container, Typography, Grid, CircularProgress } from "@mui/material";
import {
  fetchUser,
  fetchAllCountry,
  fetchCountryTimeZoneCountry,
} from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ContentCard from "../../components/ContentCard";
import ProfileContainerList from "../../components/ProfileContainerList";
import Model from "../../components/Model";
import Timezone from "../../components/Timezone";
import moment from "moment-timezone";

function Profile() {
  const { userId } = useParams();
  const dispatch = useDispatch();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modelData, setModalData] = useState({});
  const [selectedCountry, setSelectedCountry] = useState(moment.tz.guess());

  const AllPost = useSelector((state) => state.user.allPosts);
  const userPost = AllPost?.filter((item) => item.userId == userId);
  const allCountry = useSelector((state) => state.user.allCountry);
  const selectedCountryTimezone = useSelector(
    (state) => state.user.countryTimeZone
  );
  const isLoading = useSelector((state) => state.user.isInfoLoad);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUser(userId));
      dispatch(fetchAllCountry());
    }
  }, [userId, dispatch]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalIsOpen && !event.target.closest(".modal-content")) {
        setModalIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [modalIsOpen]);

  const onCardClickHandler = (data) => {
    setModalData(data);
    setModalIsOpen(true);
  };

  const onDropdownSelectHandler = (e, value) => {
    setSelectedCountry(value);
    dispatch(fetchCountryTimeZoneCountry(value));
  };

  return (
    <Container maxWidth="md" className="Container">
      <div className="profile_container">
        <Timezone
          timezone={selectedCountryTimezone?.timezone || selectedCountry}
          countries={allCountry}
          onDropdownSelectHandler={(e, value) =>
            onDropdownSelectHandler(e, value)
          }
          selectedCountry={selectedCountry}
        />
        {isLoading ? (
          <CircularProgress className="loading_spiner" />
        ) : (
          <div className="profile_content">
            <Typography>Profile</Typography>
            <ProfileContainerList />
            <div className="Card_container">
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                {userPost?.map((item) => {
                  return (
                    <Grid item xs={12} sm={4} md={4} key={item.id}>
                      <ContentCard
                        data={item}
                        onCardClickHandler={() => onCardClickHandler(item)}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          </div>
        )}
      </div>
      {modalIsOpen && <Model data={modelData} />}
    </Container>
  );
}

export default Profile;
