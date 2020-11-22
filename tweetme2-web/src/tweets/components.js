import React, { useState, useEffect } from 'react'

function loadTweets(callback) {
    const xhr = new XMLHttpRequest()
    const method = 'GET' // "POST"
    const url = "http://localhost:8000/api/tweets/"
    const responseType = "json"
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.onload = function () {
        callback(xhr.response, xhr.status)
    }
    xhr.onerror = function (e) {
        console.log(e)
        callback({ "message": "the request was an error" }, xhr.status)
    }
    xhr.send()
}

export function TweetsList(props) {
    const [tweets, setTweets] = useState([])
    useEffect(() => {
        // do my lookup
        const myCallback = (response, status) => {
            if (status === 200) {
                setTweets(response)
            }
        }
        loadTweets(myCallback)

    }, [])

    return tweets.map((item, index) => {
        return <Tweet tweet={item} key={index} />
    })

}

function ActionBtn(props) {
    const { tweet, action } = props
    const className = props.className ? props.className : 'btn btn-primary btn-sm'
    const actionDisplay = action.display ? action.display : "Action"
    const display = action.type === 'like' ? `${tweet.likes} ${actionDisplay}` : `${actionDisplay}`
    const handleClick = (e) => {
        e.preventDefault()
        if (action.type === 'like') {
            console.log(tweet.likes + 1)
        }
    }
    return <button className={className} onClick={handleClick}>{display}</button>
}

export function Tweet(props) {
    const { tweet } = props
    const className = props.className ? props.className : "col-10 col-md-6 mx-auto border rounded py-3 mb-4 bg-white text-dark"
    return (
        <div className={className} id={tweet.id}>
            <p>{tweet.id} - {tweet.content}</p>
            <div className='btn btn-group'>
                <ActionBtn tweet={tweet} action={{ type: "like", display: "Likes" }} />
                <ActionBtn tweet={tweet} action={{ type: "unlike", display: "UnLike" }} />
                <ActionBtn tweet={tweet} action={{
                    type: "ReTweet",
                }} />
            </div>
        </div>
    )
}

