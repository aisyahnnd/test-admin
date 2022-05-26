import * as React from "react";
import { Card, CardContent, CardHeader } from '@mui/material';
import { Title } from 'react-admin';

export default () => (
    <Card>
        <Title title="My Admin" />
        <CardHeader title="Welcome to the administration" />
        <CardContent>Lorem ipsum sic dolor amet...</CardContent>
    </Card>
);