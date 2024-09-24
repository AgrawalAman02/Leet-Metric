document.addEventListener("DOMContentLoaded", function(){
    const searchBtn = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardStatsContainer = document.querySelector(".stats-cards");
    const progressClass = document.querySelector(".progress");
    const name  = document.querySelector(".name");

    //return true or false based on regex
    function validateUsername(username){
        if(username==""){ 
            alert("Username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if(!isMatching) alert("Invalid username");
        return isMatching;
    }

    function displayUserData(data){
        const easySolved = (data.easySolved/data.totalEasy)*100;
        const mediumSolved = (data.mediumSolved/data.totalMedium)*100;
        const hardSolved = (data.hardSolved/data.totalHard)*100;
        console.log(easySolved," " ,mediumSolved, " ", hardSolved);

        easyProgressCircle.style.setProperty("--progress-degree",`${easySolved}%`);
        mediumProgressCircle.style.setProperty("--progress-degree",`${hardSolved}%`);
        hardProgressCircle.style.setProperty("--progress-degree",`${mediumSolved}%`);

        easyLabel.textContent= `${data.easySolved}/${data.totalEasy}`;
        mediumLabel.textContent= `${data.mediumSolved}/${data.totalMedium}`;
        hardLabel.textContent= `${data.hardSolved}/${data.totalHard}`;

        name.style.display="block" ;

        progressClass.style.display="flex";
        // progressClass.style.flexDirection="column";

        
    }

    async function fetchUserDetails(username) {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
        try{
            searchBtn.textContent ="Searching...";
            searchBtn.disabled = true;

            const response = await fetch(url);
            if(!response.ok){
                throw new Error("Unable to fetch user-details...");
            }
            const data = await response.json();
            console.log("user datails : ", data);
            displayUserData(data);

        }
        catch(error){
            console.error("Error fetching user details:", error);
        }
        finally{
            searchBtn.textContent ="Search";
            searchBtn.disabled = false;
            usernameInput.value="";
        }
    }

    searchBtn.addEventListener("click", ()=>{
        const username = usernameInput.value;
        name.textContent =`Hii! ${username}`;
        // console.log(username);

        if(validateUsername(username)){
            fetchUserDetails(username);
        }
    })
    usernameInput.addEventListener("click",()=>{
        name.style.display="none" ;

        progressClass.style.display="none";
    });
})

