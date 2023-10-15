import React from 'react'
import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'


const Togglable = forwardRef((props, ref) => {

    Togglable.displayName = 'Togglable'


    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    Togglable.propTypes = {
        buttonLabelOpen: PropTypes.string.isRequired,
        buttonLabelClose: PropTypes.string.isRequired
    }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })


    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabelOpen}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>{props.buttonLabelClose}</button>
            </div>
        </div>
    )
})

export default Togglable