import React from 'react';
import PropTypes from 'prop-types';
import SectionWrapper from './section-wrapper';
import { toHtml, formatType } from '../../util/formatters';

export default class Parameters extends React.Component {
    render() {
        const { section } = this.props;
        return (
            <SectionWrapper title="Parameters" {...this.props}>
                {section.params.map((param, i) => (
                    <div key={i} className="mb-1">
                        <React.Fragment>
                            <span className="fw-bolder me-1">{param.name}</span>
                            <code>({formatType(param.type)})</code>
                            {param.default && (
                                <span>
                                    {'('}
                                    default <code>{param.default}</code>
                                    {')'}
                                </span>
                            )}
                            {toHtml(param.description, true)}
                        </React.Fragment>
                        {param.properties && (
                            <div className="mt-1 mb12 scroll-auto">
                                <table className="table table-reference table-bordered rounded-3 overflow-hidden">
                                    <colgroup>
                                        <col width="30%" />
                                        <col width="70%" />
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {param.properties.map((property, i) => (
                                            <tr key={i}>
                                                <th className="text-break">
                                                    {property.name}

                                                    <div className="text-break">
                                                        {formatType(
                                                            property.type
                                                        )}
                                                    </div>

                                                    {property.default && (
                                                        <div className="text-break">
                                                            default:{' '}
                                                            {property.default}
                                                        </div>
                                                    )}
                                                </th>
                                                <td
                                                    style={{
                                                        wordBreak: 'break-word'
                                                    }}
                                                >
                                                    {toHtml(
                                                        property.description,
                                                        true
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                ))}
            </SectionWrapper>
        );
    }
}

Parameters.propTypes = {
    section: PropTypes.shape({
        params: PropTypes.array.isRequired
    }).isRequired
};
