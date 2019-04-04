import React from 'react'

export default function Form(props) {
  // const props_ = {props};

  // console.log("propose are ",props);
  return (
    <div className="m-2">
      {/* <form className="p-3 input-group mb-3" onSubmit={props.getWeather}> */}
      <form className="p-3 input-group mb-3" onSubmit={props.findCity}>
        <div className="input-group-prepend"><span className="input-group-text">Location</span></div>
        <input type="text" name='city' className="form-control" placeholder="City" />
        {/* <input type="text" name='country' className="form-control" placeholder="Country" /> */}
        <div className="input-group-append">
          <button className="btn btn-success" type="submit">Go</button>
        </div>
      </form>
    </div>

  )
}
