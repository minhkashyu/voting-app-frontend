import {
    //API_URL,
    //PUBLIC_URL,
    //errorHandler,
    getRequest,
    postRequest,
    deleteRequest
    } from './index';
import {
    RECEIVE_POLLS,
    RECEIVE_MY_POLLS,
    RECEIVE_SINGLE_POLL,
    SUBMIT_VOTE,
    ADD_POLL,
    DELETE_POLL,
    POLL_ERROR
} from './types';

//= ===============================
// Polling actions
//= ===============================

export function fetchPolls() {
    let url = '/polls';
    return (dispatch, getState, cookies) => getRequest(RECEIVE_POLLS, POLL_ERROR, false, false, url, dispatch, cookies);
}

export function fetchMyPolls() {
    return (dispatch, getState, cookies) => {
        let url = '/polls/my';
        getRequest(RECEIVE_MY_POLLS, POLL_ERROR, true, false, url, dispatch, cookies);
    };
}

export function fetchSinglePoll(pollId) {
    return (dispatch, getState, cookies) => {
        let url = `/polls/${pollId}`;
        getRequest(RECEIVE_SINGLE_POLL, POLL_ERROR, false, true, url, dispatch, cookies);
    };
}

export function addPoll(data) {
    return (dispatch, getState, cookies) => {
        let url = `/polls`;
        postRequest(ADD_POLL, POLL_ERROR, true, true, url, dispatch, cookies, data);
    };
}

export function deletePoll(id) {
    let url = `/polls/${id}`;
    return (dispatch, getState, cookies) => deleteRequest(DELETE_POLL, POLL_ERROR, true, true, url, dispatch, cookies);
}

export function submitVote(pollId, optionId, blAdd) {
    let url = blAdd ? `/polls/${pollId}/options` : `/polls/${pollId}/options/${optionId}/vote`;
    let data = blAdd ? { name: optionId } : {};
    return (dispatch, getState, cookies) => postRequest(SUBMIT_VOTE, POLL_ERROR, blAdd, false, url, dispatch, cookies, data);
}

export function displayChart(title, options) {
    return function () {
        /* eslint-disable no-undef */
        let arrOptions = [['Option', 'Votes']];
        options.map(option => arrOptions.push([option.name, option.vote]));

        const drawChart = () => {
            let data = google.visualization.arrayToDataTable(arrOptions);

            let options = {
                title: title,
                is3D: true
            };

            let chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
            chart.draw(data, options);
        };

        google.charts.load("current", {packages: ["corechart"]});
        google.charts.setOnLoadCallback(drawChart);
    };
}