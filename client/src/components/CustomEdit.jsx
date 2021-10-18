import React from 'react'

class CustomEdit extends React.Component{
    render(){
        return(
            <form className="links-form" onSubmit={this.handleFormSubmit}>
        <div className="link">
          <label htmlFor="title">custom label:</label>
          <input
            type="text"
            name="title"
            defaultValue={this.props.linkDesc.title}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="link">
          <label htmlFor="desc">Chimaera Card Details:</label>
          <input
            type="text"
            name="desc"
            defaultValue={this.props.linkDesc.desc}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="link">
          <label htmlFor="desc">Chimaera Card Link:</label>
          <input
            type="text"
            name="link"
            defaultValue={this.props.linkDesc.link}
            onChange={this.handleInputChange}
          />
        </div>
        {this.props.full_colored_button && (
          <div className="link">
            <label htmlFor="desc">Button Color:</label>
            <InputColor
              initialHexColor={this.props.linkDesc.bcColor}
              onChange={this.setColor}
              placement="Color"
              name="colorinput"
              style={{ margin: "10px 15px 0 0" }}
            />
          </div>
        )}
        <div className="fun">
          <button
            onClick={e => {
              this.handleFormSubmit(e, onClose);
            }} 
          >
            Save
          </button>
        </div>
      </form>
        )
    }
}