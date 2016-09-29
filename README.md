# vu_msc_tweetsumm
Thesis Project for MSc. in Business Information Sciences, at VU University Amsterdam

##Description
Microblogging sites have become popular platforms for online news reporting as well as socially participating in and interacting with the discussion of real-time events. This paper researches an automated solution to the inability of a human to wholly consume and comprehend the vast amount of data surrounding topics online. We introduce the Collective Reactions for Event Summarization (CRES) approach, which uses an original combination of proven algorithms to harness signals in online activity, social interactions, content metadata, and language overlap to build comprehensive summaries of events through collective reactions from the crowd. The methodology is open sourced as an end-to-end framework exemplified using twelve open domain events. Our experiments consider the two questions of: create a standard feature set for consistently classifying newsworthiness in open domain microblog documents, and provide a summary which improves upon the defined baseline when evaluated using CrowdTruth. Results show promising results towards consistent classification on open domain documents, and significant improvements to our baseline for automating event summarization on Twitter.

The final dashboard visualizes 12 events, 6 from each of the 2 domains of Sporting events and Technology Conferences. Each event is summarized for comparative evaluation using four methods: 

1. An "Interactions" approach considered as the state of the art that is currently implemented on Twitter when making a query 
2. An event detection method with phrase reinforcement summarization called "CRES 0.0"
3. An event detection method considering social engagements with phrase reinforcement summarization called "CRES 1.0"
4. An event detection method considering social engagements, with corpus filtering using a supervised classifier, and then summarized using phrase reinforcement called "CRES 2.0"

[view the dashboard](https://rawgit.com/knanne/vu_msc_tweetsumm/master/dashboard/index.html) using [rawgit](http://rawgit.com/)