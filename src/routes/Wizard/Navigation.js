
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

export default function Navigation({ activeStep, setActiveStep, inputComplete }) {
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return <>
    <Box sx={{ mb: 2 }}>
      <div>
        <Button
          variant="contained"
          onClick={handleNext}
          sx={{ mt: 1, mr: 1 }}
        >
          { inputComplete ? 'Continue' : 'Skip' }
        </Button>
        { activeStep !== 0 ? <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>Back</Button> : null }
      </div>
    </Box>
  </>
}