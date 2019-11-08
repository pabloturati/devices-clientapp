import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import FormHelperText from '@material-ui/core/FormHelperText'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}))

const Dropdown = ({ label, value, onChange, options, subtitle }) => {
  const classes = useStyles()

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel>{label}</InputLabel>
        <Select
          labelId='demo-simple-select-helper-label'
          value={value}
          onChange={event => {
            onChange(event.target.value)
          }}
        >
          {options.map((option, idx) => (
            <MenuItem key={idx} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        {subtitle && <FormHelperText>{subtitle}</FormHelperText>}
      </FormControl>
    </div>
  )
}

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired
}

Dropdown.defaultProps = {
  options: []
}

export default Dropdown
