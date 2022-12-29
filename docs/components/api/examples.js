import React from 'react';
import PropTypes from 'prop-types';
import SectionWrapper from './section-wrapper';
import { toHtml } from '../../util/formatters';

export default class Examples extends React.Component {
    render() {
        const { section } = this.props;
        return (
            <SectionWrapper title="Example" {...this.props}>
                {section.examples.map((example, i) => (
                    <div key={i} className="mb-1 api-example">
                        {example.caption && <p>{toHtml(example.caption)}</p>}
                        <pre>
                            <code className="language-js">
                                {example.description}
                            </code>
                        </pre>
                    </div>
                ))}
            </SectionWrapper>
        );
    }
}

Examples.propTypes = {
    section: PropTypes.shape({
        examples: PropTypes.arrayOf(
            PropTypes.shape({
                caption: PropTypes.string,
                description: PropTypes.string.isRequired
            })
        ).isRequired
    }).isRequired
};
