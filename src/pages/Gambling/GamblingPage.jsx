import React, { useState, useEffect } from 'react'
import styles from './GamblingPage.module.css'
import { useParams } from "react-router-dom"
import axios from 'axios';
import { GiCricketBat } from "react-icons/gi";
import { BiSolidCricketBall } from "react-icons/bi"
import {useNavigate} from 'react-router-dom'
import { IoIosArrowRoundBack } from "react-icons/io";

const GamblingPage = () => {

    const navigate = useNavigate()

    const { id } = useParams();

    const [matchdata, setMatchData] = useState([])
    const [predictData, setpredictData] = useState(null)
    const [amountwiningteam, setamountwiningteam] = useState(100)
    const [amounttwoover, setamounttwoover] = useState(100)
    const [amountfiveover, setamountfiveover] = useState(100)
    const [amounttotalrun, setamounttotalrun] = useState(100)
    const [amounttotalwicket, setamounttotalwicket] = useState(100)

    console.log("ohkk", predictData);


    // First Match useEffect
    useEffect(() => {
        let interval;

        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/findcurrentmatch/${id}`, {
                    withCredentials: true
                });

                setMatchData(response.data);
                console.log("📊 Live match data:", response.data);

                // 🛑 Stop polling if match is completed
                if (response.data?.status === "completed") {
                    console.log("🏆 Match is completed. Stopping updates...");
                    clearInterval(interval);
                }
            } catch (error) {
                console.error("❌ Error fetching match data:", error);
            }
        };

        // ✅ Start polling only if match is not completed
        if (!matchdata || matchdata.status !== "completed") {
            interval = setInterval(fetchData, 3000);
            fetchData(); // ✅ Fetch immediately instead of waiting 3 seconds
        }

        return () => clearInterval(interval); // Cleanup on unmount
    }, [matchdata?.status]); // ✅ Stops polling when match status changes



    // First Predection useEffect
    useEffect(() => {
        if (!id) return; // ✅ Prevent API call if `id` is undefined

        const fetchdata = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/findprediction/${id}`, {
                    withCredentials: true
                });

                if (!response.data || response.data.length === 0) {
                    console.warn("No prediction data found");
                    setpredictData(null); // ✅ Handle empty response
                } else {
                    setpredictData(response.data);
                }
            } catch (error) {
                console.error("Error fetching prediction data:", error);
            }
        };

        fetchdata();
    }, [id]);
    // ✅ Add `id` as a dependency


    const handelWiningTeam = async (team) => {
        if (!matchdata?.teams || matchdata.teams.length < 2) {
            console.error("Teams data is not available.");
            return;
        }

        let predictedWinner;
        if (team === "yes") {
            predictedWinner = matchdata.teams.find(team => team.isBatting)?.teamName;
        } else {
            predictedWinner = matchdata.teams.find(team => !team.isBatting)?.teamName;
        }

        if (!predictedWinner) {
            console.error("Predicted winner not determined.");
            return;
        }

        try {
            if (predictData != null) {
                const response = await axios.patch(
                    `${import.meta.env.VITE_BACKENDURL}/api/prediction/${predictData._id}`,
                    { predictedWinnerTeam: predictedWinner, amountBetforwinner: amountwiningteam },
                    { withCredentials: true }
                );
                console.log("Prediction response:", response.data);
                setpredictData(response.data);
            } else {
                const response = await axios.post(
                    `${import.meta.env.VITE_BACKENDURL}/api/prediction/${id}`,
                    { predictedWinnerTeam: predictedWinner, amountBetforwinner: amountwiningteam },
                    { withCredentials: true }
                );
                console.log("Prediction response:", response.data);
                setpredictData(response.data);
            }
        } catch (error) {
            console.error("Error submitting prediction:", error);
        }
    };


    const handelAfterTwoOvers = async (res) => {
        if (!matchdata?.teams || matchdata.teams.length < 2) {
            console.error("Teams data is not available.");
            return;
        }

        console.log("clikkkkkkkkkkkk");


        let predictedWinner;

        predictedWinner = matchdata.teams.find(team => team.isBatting)?.teamName;


        try {

            const requestData = {
                afterTwoOvers: [{ team: predictedWinner, decision: res }],
                amountBetfortwoover: amounttwoover  // ✅ FIXED HERE
            };

            if (predictData != null) {
                const response = await axios.patch(
                    `${import.meta.env.VITE_BACKENDURL}/api/prediction/${predictData._id}`,
                    requestData,
                    { withCredentials: true }
                );
                console.log("Aftertwover fun response:", response.data);
                setpredictData(response.data);
            } else {
                const response = await axios.post(
                    `${import.meta.env.VITE_BACKENDURL}/api/prediction/${id}`,
                    requestData,
                    { withCredentials: true }
                );
                console.log("Aftertwover fun response:", response.data);
                setpredictData(response.data);
            }

        } catch (error) {
            console.log("Aftertwover fun error prediction:", error);

        }

    }

    const handelAfterFiveOvers = async (res) => {
        if (!matchdata?.teams || matchdata.teams.length < 2) {
            console.error("Teams data is not available.");
            return;
        }

        let predictedWinner;

        predictedWinner = matchdata.teams.find(team => team.isBatting)?.teamName;

        try {

            const requestData = {
                afterFiveOvers: [{ team: predictedWinner, decision: res }],
                amountBetforfiveover: amountfiveover  // ✅ FIXED HERE
            };

            if (predictData != null) {
                const response = await axios.patch(
                    `${import.meta.env.VITE_BACKENDURL}/api/prediction/${predictData._id}`,
                    requestData,
                    { withCredentials: true }
                );
                console.log("Aftertwover fun response:", response.data);
                setpredictData(response.data);
            } else {
                const response = await axios.post(
                    `${import.meta.env.VITE_BACKENDURL}/api/prediction/${id}`,
                    requestData,
                    { withCredentials: true }
                );
                console.log("Aftertwover fun response:", response.data);
                setpredictData(response.data);
            }

        } catch (error) {
            console.log("Aftertwover fun error prediction:", error);
        }

    }

    const handelTotalWicket = async (res) => {
        if (!matchdata?.teams || matchdata.teams.length < 2) {
            console.error("Teams data is not available.");
            return;
        }

        try {

            if (predictData != null) {
                const response = await axios.patch(
                    `${import.meta.env.VITE_BACKENDURL}/api/prediction/${predictData._id}`,
                    { totalWicket: res, amountBetfortotalwicket: amounttotalwicket },
                    { withCredentials: true }
                );
                console.log("Aftertwover fun response:", response.data);
                setpredictData(response.data);
            } else {
                const response = await axios.post(
                    `${import.meta.env.VITE_BACKENDURL}/api/prediction/${id}`,
                    { totalWicket: res, amountBetfortotalwicket: amounttotalwicket },
                    { withCredentials: true }
                );
                console.log("Aftertwover fun response:", response.data);
                setpredictData(response.data);
            }

        } catch (error) {
            console.log("Aftertwover fun error prediction:", error);

        }
    }
    const handelTotalRuns = async (res) => {
        if (!matchdata?.teams || matchdata.teams.length < 2) {
            console.error("Teams data is not available.");
            return;
        }

        try {

            if (predictData != null) {
                const response = await axios.patch(
                    `${import.meta.env.VITE_BACKENDURL}/api/prediction/${predictData._id}`,
                    {
                        totalRuns: res,
                        amountBetforrotalruns: amounttotalrun
                    },
                    { withCredentials: true }
                );
                console.log("Aftertwover fun response:", response.data);
                setpredictData(response.data);
            } else {
                const response = await axios.post(
                    `${import.meta.env.VITE_BACKENDURL}/api/prediction/${id}`,
                    { totalRuns: res , amountBetforrotalruns: amounttotalrun},
                    { withCredentials: true }
                );
                console.log("Aftertwover fun response:", response.data);
                setpredictData(response.data);
            }

        } catch (error) {
            console.log("Aftertwover fun error prediction:", error);
        }
    }


    //AfterTwoOvers user payout
    useEffect(() => {
        const updatePayoutAfterTwoOvers = async () => {
            if (
                matchdata?.teams &&
                matchdata.teams.length >= 2 &&
                (matchdata.teams[0].totalOvers === 2 || matchdata.teams[1].totalOvers === 2) &&
                predictData?.afterTwoOvers?.length > 0
            ) {
                try {
                    const isWinningPrediction =
                        matchdata.teams[0].teamName === predictData.afterTwoOvers[0].team
                            ? matchdata.teams[0].totalRuns
                            : matchdata.teams[1].totalRuns;

                    let payoutAmount = 0;

                    if (isWinningPrediction > 20 && predictData.afterTwoOvers[0].decision === "yes") {
                        payoutAmount = predictData.amountBetfortwoover * 2;
                    } else {
                        payoutAmount = -(predictData.amountBetfortwoover * 2)
                    }

                    console.log("payyyyyyyyyyyyyyyyy", payoutAmount);
                    console.log("paooooooooooooooooooooo", predictData.amountBetfortwoover);
                    console.log("paooooooooooooooooooooo", predictData.payout);

                    const response = await axios.patch(
                        `${import.meta.env.VITE_BACKENDURL}/api/prediction/${predictData._id}`,
                        {
                            payout: predictData.payout + payoutAmount, // ✅ Accumulate payout
                            amountBetfortwoover: 0, // ✅ Reset bet
                        },
                        { withCredentials: true }
                    );

                    // Balance Update
                    const response1 = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/balance`, {
                        withCredentials: true,
                    });
                    if (response1?.data) {
                        await axios.patch(`${import.meta.env.VITE_BACKENDURL}/api/balance`, {
                            balance: response1?.data?.balance + payoutAmount
                        }, {
                            withCredentials: true,
                        });
                    }

                    console.log("Payout update response:", response.data);

                    setpredictData((prevData) => ({
                        ...prevData,
                        payout: prevData.payout + payoutAmount,
                        amountBetfortwoover: 0,
                    }));
                } catch (error) {
                    console.error("Error updating payout:", error);
                }
            }
        };

        // ✅ Run only when totalOvers changes to exactly 2 (once per match)
        if (
            matchdata?.teams &&
            matchdata.teams.length >= 2 &&
            (matchdata.teams[0].totalOvers === 2 || matchdata.teams[1].totalOvers === 2)
        ) {
            updatePayoutAfterTwoOvers();
        }
    }, [
        matchdata?.teams?.[0]?.totalOvers, // ✅ Trigger only when totalOvers reaches 2
        matchdata?.teams?.[1]?.totalOvers,
    ]);


    //AfterFiveOvers user payout

    useEffect(() => {
        const updatePayoutAfterTwoOvers = async () => {
            if (
                matchdata?.teams &&
                matchdata.teams.length >= 2 &&
                (matchdata.teams[0].totalOvers === 5 || matchdata.teams[1].totalOvers === 5) &&
                predictData?.afterTwoOvers?.length > 0
            ) {
                try {
                    const isWinningPrediction =
                        matchdata.teams[0].teamName === predictData.afterFiveOvers[0].team
                            ? matchdata.teams[0].totalRuns
                            : matchdata.teams[1].totalRuns;

                    let payoutAmount = 0;

                    if (isWinningPrediction > 80 && predictData.afterTwoOvers[0].decision === "yes") {
                        payoutAmount = predictData.amountBetforfiveover * 2;
                    } else {
                        payoutAmount = -(predictData.amountBetforfiveover * 2)
                    }

                    console.log("payyyyyyyyyyyyyyyyy", payoutAmount);
                    console.log("paooooooooooooooooooooo", predictData.amountBetforfiveover);
                    console.log("paooooooooooooooooooooo", predictData.payout);

                    const response = await axios.patch(
                        `${import.meta.env.VITE_BACKENDURL}/api/prediction/${predictData._id}`,
                        {
                            payout: predictData.payout + payoutAmount, // ✅ Accumulate payout
                            amountBetforfiveover: 0, // ✅ Reset bet
                        },
                        { withCredentials: true }
                    );

                    // Balance Update
                    const response1 = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/balance`, {
                        withCredentials: true,
                    });
                    if (response1?.data) {
                        await axios.patch(`${import.meta.env.VITE_BACKENDURL}/api/balance`, {
                            balance: response1?.data?.balance + payoutAmount
                        }, {
                            withCredentials: true,
                        });
                    }

                    console.log("Payout update response:", response.data);

                    setpredictData((prevData) => ({
                        ...prevData,
                        payout: prevData.payout + payoutAmount,
                        amountBetforfiveover: 0,
                    }));
                } catch (error) {
                    console.error("Error updating payout:", error);
                }
            }
        };

        // ✅ Run only when totalOvers changes to exactly 2 (once per match)
        if (
            matchdata?.teams &&
            matchdata.teams.length >= 2 &&
            (matchdata.teams[0].totalOvers === 5 || matchdata.teams[1].totalOvers === 5)
        ) {
            updatePayoutAfterTwoOvers();
        }
    }, [
        matchdata?.teams?.[0]?.totalOvers, // ✅ Trigger only when totalOvers reaches 2
        matchdata?.teams?.[1]?.totalOvers,
    ]);

    //TotalRuns user payout
    useEffect(() => {
        const updatePayoutForTotalRuns = async () => {
            if (
                matchdata?.teams &&
                matchdata.teams.length >= 2 &&
                predictData?.totalRuns
            ) {
                try {
                    // ✅ Get total runs for the winning team
                    const totalRunsScored = matchdata.teams[0].totalRuns + matchdata.teams[1].totalRuns


                    let payoutAmount = 0;

                    // ✅ Check if user predicted correctly
                    if (totalRunsScored >= 200 && predictData.totalRuns === "yes") {
                        payoutAmount = predictData.amountBetforrotalruns * 2;
                    } else if (totalRunsScored < 200 && predictData.totalRuns === "no") {
                        payoutAmount = (predictData.amountBetforrotalruns * 2);
                    } else {
                        payoutAmount = -(predictData.amountBetforrotalruns * 2);
                    }

                    console.log("Payout for total runs:", payoutAmount);

                    const response = await axios.patch(
                        `${import.meta.env.VITE_BACKENDURL}/api/prediction/${predictData._id}`,
                        {
                            payout: predictData.payout + payoutAmount, // ✅ Accumulate payout
                            amountBetforrotalruns: 0, // ✅ Reset bet
                        },
                        { withCredentials: true }
                    );

                    // Balance Update
                    const response1 = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/balance`, {
                        withCredentials: true,
                    });
                    if (response1?.data) {
                        await axios.patch(`${import.meta.env.VITE_BACKENDURL}/api/balance`, {
                            balance: response1?.data?.balance + payoutAmount
                        }, {
                            withCredentials: true,
                        });
                    }

                    console.log("Payout update response for total runs:", response.data);

                    setpredictData((prevData) => ({
                        ...prevData,
                        payout: prevData.payout + payoutAmount,
                        amountBetforrotalruns: 0,
                    }));
                } catch (error) {
                    console.error("Error updating payout for total runs:", error);
                }
            }
        };

        // ✅ Run only when the match ends
        if (matchdata?.teams?.length >= 2 && matchdata.status === "completed") {
            updatePayoutForTotalRuns();
        }
    }, [matchdata?.status]); // ✅ Runs when match status changes to "completed"


    //TotalWicket user payout
    useEffect(() => {
        const updatePayoutForTotalWickets = async () => {
            if (
                matchdata?.teams &&
                matchdata.teams.length >= 2 &&
                predictData?.totalWicket
            ) {
                try {
                    // ✅ Get total wickets taken in the match
                    const totalWicketsTaken =
                        matchdata.teams[0].totalWickets + matchdata.teams[1].totalWickets;

                    let payoutAmount = 0;

                    // ✅ Check if user predicted correctly
                    if (totalWicketsTaken >= 10 && predictData.totalWicket === "yes") {
                        payoutAmount = predictData.amountBetfortotalwicket * 2;
                    } else if (totalWicketsTaken < 10 && predictData.totalWicket === "no") {
                        payoutAmount = predictData.amountBetfortotalwicket * 2;
                    } else {
                        payoutAmount = -(predictData.amountBetfortotalwicket * 2);
                    }

                    console.log("Payout for total wickets:", payoutAmount);

                    const response = await axios.patch(
                        `${import.meta.env.VITE_BACKENDURL}/api/prediction/${predictData._id}`,
                        {
                            payout: predictData.payout + payoutAmount, // ✅ Accumulate payout
                            amountBetfortotalwicket: 0, // ✅ Reset bet
                        },
                        { withCredentials: true }
                    );

                    // Balance Update
                    const response1 = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/balance`, {
                        withCredentials: true,
                    });
                    if (response1?.data) {
                        await axios.patch(`${import.meta.env.VITE_BACKENDURL}/api/balance`, {
                            balance: response1?.data?.balance + payoutAmount
                        }, {
                            withCredentials: true,
                        });
                    }

                    console.log("Payout update response for total wickets:", response.data);

                    setpredictData((prevData) => ({
                        ...prevData,
                        payout: prevData.payout + payoutAmount,
                        amountBetfortotalwicket: 0,
                    }));
                } catch (error) {
                    console.error("Error updating payout for total wickets:", error);
                }
            }
        };

        // ✅ Run only when the match ends
        if (matchdata?.teams?.length >= 2 && matchdata.status === "completed") {
            updatePayoutForTotalWickets();
        }
    }, [matchdata?.status]); // ✅ Runs when match status changes to "completed"


    //PredictedWinnerTeam user payout
    useEffect(() => {
        const updatePayoutForPredictedWinner = async () => {
            if (
                matchdata?.teams &&
                matchdata.teams.length >= 2 &&
                predictData?.predictedWinnerTeam
            ) {
                try {
                    // ✅ Get the winning team name
                    const winningTeamName = matchdata.WiningTeam;

                    let payoutAmount = 0;

                    // ✅ Check if user predicted correctly
                    if (winningTeamName === predictData.predictedWinnerTeam) {
                        payoutAmount = predictData.amountBetforwinner * 2;
                    } else {
                        payoutAmount = -(predictData.amountBetforwinner * 2);
                    }

                    console.log("Payout for predicted winner:", payoutAmount);

                    const response = await axios.patch(
                        `${import.meta.env.VITE_BACKENDURL}/api/prediction/${predictData._id}`,
                        {
                            payout: predictData.payout + payoutAmount, // ✅ Accumulate payout
                            amountBetforwinner: 0, // ✅ Reset bet
                        },
                        { withCredentials: true }
                    );

                    // Balance Update
                    const response1 = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/balance`, {
                        withCredentials: true,
                    });
                    if (response1?.data) {
                        await axios.patch(`${import.meta.env.VITE_BACKENDURL}/api/balance`, {
                            balance: response1?.data?.balance + payoutAmount
                        }, {
                            withCredentials: true,
                        });
                    }


                    console.log("Payout update response for predicted winner:", response.data);

                    setpredictData((prevData) => ({
                        ...prevData,
                        payout: prevData.payout + payoutAmount,
                        amountBetforwinner: 0,
                    }));
                } catch (error) {
                    console.error("Error updating payout for predicted winner:", error);
                }
            }
        };

        // ✅ Run only when the match ends
        if (matchdata?.teams?.length >= 2 && matchdata.status === "completed") {
            updatePayoutForPredictedWinner();
        }
    }, [matchdata?.status]); // ✅ Runs when match status changes to "completed"





    return (
        <>
            {(matchdata && matchdata?.teams && matchdata?.teams?.length >= 2) ? (
                <div className={styles.maincontainer}>
                    <div className={styles.backbtn} onClick={()=>navigate("/")}><IoIosArrowRoundBack className={styles.iconbackk} onClick={()=>navigate("/")}/></div>
                    <div className={styles.firstcontainer}>
                        <div className={styles.firstleftcontainer}>CAMERA - PART</div>
                        <div className={styles.firstrightcontainer}>
                            <h2>SAMUDRAGARH - PREMIER - LEAGUE</h2>
                            <div className={styles.boxcontainer}>
                                <div className={styles.leftbox}>
                                    <div className={styles.teamname}>{matchdata.teams[0].teamName} (Group-A){matchdata.teams[0].isBatting ?  <GiCricketBat className={styles.icon}/> : "" }</div>
                                    <div className={styles.runbox}>{matchdata.teams[0].totalRuns}/{matchdata.teams[0].totalWickets}</div>
                                    <div className={styles.overcount}>({matchdata.teams[0].totalOvers}).overs</div>
                                </div>
                                <div className={styles.vs}>v/s</div>
                                <div className={styles.leftbox}>
                                    <div className={styles.teamname}>{matchdata.teams[1].teamName} (Group-B){matchdata.teams[1].isBatting ?  <GiCricketBat className={styles.icon}/> : "" }</div>
                                    <div className={styles.runbox}>{matchdata.teams[1].totalRuns}/{matchdata.teams[1].totalWickets}</div>
                                    <div className={styles.overcount}>({matchdata.teams[1].totalOvers}).overs</div>
                                </div>
                            </div>
                            <div className={styles.firstbootmbox}>
                                <div>Target: {matchdata.target}</div>
                                <div>Scorecard Team-A</div>
                                <div>Scorecard Team-B</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.secondContainer}>
                        <div className={styles.Box1}>
                            <h3>Who Will Win ?</h3>
                            <div className={styles.detailbox}>{matchdata.teams[0].teamName} Win against {matchdata.teams[1].teamName}</div>
                            <div className={styles.parabox}>If you are intrested with ₹100:</div>
                            <div className={styles.buttonContainer}>
                                <button className={styles.yesbutton} onClick={() => handelWiningTeam("yes")}>YES</button>
                                <button className={styles.nobutton} onClick={() => handelWiningTeam("no")}>NO</button>
                            </div>
                        </div>
                        <div className={styles.divideraling}></div>
                        <div className={styles.Box1}>
                            <h3>Total Runs</h3>
                            <div className={styles.detailbox}>Total Runs more than 120</div>
                            <div className={styles.parabox}>If you are intrested with ₹100</div>
                            <div className={styles.buttonContainer}>
                                <button className={styles.yesbutton} onClick={() => handelTotalRuns("yes")}>YES</button>
                                <button className={styles.nobutton} onClick={() => handelTotalRuns("no")}>NO</button>
                            </div>
                        </div>
                        <div className={styles.divideraling}></div>
                        <div className={styles.Box1}>
                            <h3>More Then 20</h3>
                            <div className={styles.detailbox}>After 2 over Run more than 20</div>
                            <div className={styles.parabox}>If you are intrested with ₹100</div>
                            <div className={styles.buttonContainer}>
                                <button className={styles.yesbutton} onClick={() => handelAfterTwoOvers("yes")}>YES</button>
                                <button className={styles.nobutton} onClick={() => handelAfterTwoOvers("no")}>NO</button>
                            </div>
                        </div>
                        <div className={styles.divideraling}></div>
                        <div className={styles.Box1}>
                            <h3>More Then 80</h3>
                            <div className={styles.detailbox}>After 5 over Run more than 80</div>
                            <div className={styles.parabox}>If you are intrested with ₹100</div>
                            <div className={styles.buttonContainer}>
                                <button className={styles.yesbutton} onClick={() => handelAfterFiveOvers("yes")}>YES</button>
                                <button className={styles.nobutton} onClick={() => handelAfterFiveOvers("no")}>NO</button>
                            </div>
                        </div>
                        <div className={styles.divideraling}></div>
                        <div className={styles.Box1}>
                            <h3>Predection totalWicket</h3>
                            <div className={styles.detailbox}> Total Wickets more Than 6</div>
                            <div className={styles.parabox}>If you are intrested with ₹100</div>
                            <div className={styles.buttonContainer}>
                                <button className={styles.yesbutton} onClick={() => handelTotalWicket("yes")}>YES</button>
                                <button className={styles.nobutton} onClick={() => handelTotalWicket("no")}>NO</button>
                            </div>
                        </div>
                        <div className={styles.divideraling}></div>
                    </div>
                </div>
            ) : (<h1>Loading...</h1>)
            }
        </>
    )
}

export default GamblingPage