import React from 'react';
import PropTypes from 'prop-types';
import slug from 'slugg';

export default class Title extends React.Component {
    render() {
        const { children, section, headingLevel } = this.props;
        const pageName =
            section && section.name === 'Map class' ? 'Map' : section.name;
        const id = slug(`${pageName || ''} ${children}`);
        const HeadingLevel = `h${headingLevel}`;

        return (
            <HeadingLevel id={id} className="fs-6">
                <a className="text-secondary mb-1 fw-bold" href={`#${id}`}>
                    {children}
                </a>
            </HeadingLevel>
        );
    }
}

Title.propTypes = {
    children: PropTypes.node.isRequired,
    section: PropTypes.shape({
        name: PropTypes.string
    }),
    headingLevel: PropTypes.number
};
