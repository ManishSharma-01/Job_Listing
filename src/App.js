import { Box, Button, CircularProgress, Grid, ThemeProvider, } from "@material-ui/core";
import { Close as CloseIcon } from '@material-ui/icons';
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import JobCard from "./components/Job/JobCard";
import NewJobModal from "./components/Job/NewJobModal";
import SearchBar from "./components/SearchBar";
import { app, firestore } from "./firebase/config";
import theme from "./theme/theme";


export default () => {
  const [jobs,setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customSearch, setCustomSearch] = useState(false);
  const [newJobModal, setNewJobModal] = useState(false);

  const fetchJobs = async() => {
    setCustomSearch(false);
    setLoading(true);
    const req = await firestore
    .collection('jobs')
    .orderBy('postedOn','desc')
    .get();
    const tempJobs = req.docs.map(job => ({
      ...job.data(),
      id: job.id,
      postedOn: job.data().postedOn.toDate()
    }));
    setJobs(tempJobs);
    setLoading(false);
  };

  const fetchJobsCustom = async jobSearch =>{
    setLoading(true);
    setCustomSearch(true);
    const req = await firestore
    .collection('jobs')
    .orderBy('postedOn','desc')
    .where("location", '==', jobSearch.location)
    .where("type", '==', jobSearch.type)
    .get();
    const tempJobs = req.docs.map(job => ({
      ...job.data(),
      id: job.id,
      postedOn: job.data().postedOn.toDate()
    }));
    setJobs(tempJobs);
    setLoading(false);
  }

  const postJob = async jobDetails => {
    await firestore.collection('jobs').add({
      ... jobDetails,
      postedOn: app.firestore.FieldValue.serverTimestamp()
    });
    fetchJobs();
  }

  useEffect(()=>{
    fetchJobs();
  }, [])

  return <ThemeProvider theme={theme}>
    <Header openNewJobModal = {() => setNewJobModal(true)}  />
    <NewJobModal
    closeModal = {() => setNewJobModal(false)}
    newJobModal ={newJobModal} postJob={postJob} />
    <Box mb={3}>
    <Grid container justify = "center">
      <Grid item xs ={10}>
        <SearchBar fetchJobsCustom = {fetchJobsCustom} />
        
        {
          loading?(
            
          <Box display="flex" justifyContent="center"> <CircularProgress/>
          </Box>
          ) : (
            <>
            {customSearch &&
            <Box display="flex" justifyContent="flex-end">
              <Button onClick={fetchJobs} >
            <CloseIcon size={20}/>
              Custom Search

              </Button>
            </Box>}
            {jobs.map(job => <JobCard key={job.id} {...job} />)}
            </>
        )}
        
        

        <JobCard/>

      </Grid>
    </Grid>
    </Box>
  </ThemeProvider>
};

