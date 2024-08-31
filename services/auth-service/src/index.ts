
import app from './config/app';
import { ENV } from './config/env';

// Start the application
const port = ENV.PORT;

app.listen(port, () => {
    console.log(`Auth service is running on port ${port}`);
});
