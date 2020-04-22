import React from 'react'

const Loader = props => (
    <div className="w-100 text-center">
        <div className="spinner-border" role="status">
            <span className="sr-only">Загрузка...</span>
        </div>
    </div>
)

export default Loader