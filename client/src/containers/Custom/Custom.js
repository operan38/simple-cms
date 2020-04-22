import React, { Component, lazy } from 'react';
const Default = lazy(() => import('./Default/Default'));
const Dynamic = lazy(() => import('./Dynamic/Dynamic'));

export default class Custom extends Component {
    components = {
        'Default': Default,
        'Dynamic': Dynamic
    }

    render() {
        const ContainerName = this.components[this.props.container]
        return <ContainerName {...this.props}/>
    }
}