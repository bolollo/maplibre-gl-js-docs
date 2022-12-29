import React from 'react';
import PropTypes from 'prop-types';
//import IconText from '@mapbox/mr-ui/icon-text';
import { version } from '../../../node_modules/maplibre-gl/package.json';

export default class GitHub extends React.Component {
    render() {
        const { section } = this.props;
        return (
            section.context &&
            section.context.github && (
                <p id="github-link">
                    <img src="/assets/img/github.svg" alt="GitHubLogo" />
                    <a
                        className="text-secondary mb-2 ms-1"
                        href={`https://github.com/maplibre/maplibre-gl-js/tree/v${version}/${
                            section.context.github.url.split(
                                'node_modules/maplibre-gl/'
                            )[1]
                        }`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {
                            section.context.github.path.split(
                                'node_modules/maplibre-gl/'
                            )[1]
                        }
                    </a>
                </p>
            )
        );
    }
}

GitHub.propTypes = {
    section: PropTypes.shape({
        context: PropTypes.shape({
            github: PropTypes.shape({
                url: PropTypes.string,
                path: PropTypes.string
            })
        })
    })
};
