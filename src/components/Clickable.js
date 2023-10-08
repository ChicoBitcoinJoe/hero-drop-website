import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'

export default function Clickable({ children, onClick, disabled, sx, square }) {
  return (
    <Card square={square} elevation={0} sx={{ overflow: 'visible', height: '100%' }}>
      <CardActionArea onClick={onClick} sx={{ height: '100%', ...sx }} disabled={disabled}>
        {children}
      </CardActionArea>
    </Card>
  )
}