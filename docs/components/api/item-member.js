import React from 'react';
import PropTypes from 'prop-types';
import { formatters } from '../../util/formatters';
import ApiItem from './item';
//import Icon from '@mapbox/mr-ui/icon';
//import classnames from 'classnames';

class ApiItemMember extends React.Component {
    constructor(props) {
        super(props);
        this.state = { disclosed: false };
        this.hashChange = this.hashChange.bind(this);
    }

    href = (m) => `#${m.namespace.toLowerCase()}`;

    render() {
        const member = this.props;
        console.log(member);
        //const HeadingLevel = `h${this.props.headingLevel}`;
        return (
            <div
                className="border rounded-3 my-1 accordion-item"
                id={member.namespace.toLowerCase()}
                aria-expanded={this.state.disclosed}
            >
                <React.Fragment>
                    <div
                        className="bg-lighter"
                        onClick={(e) => {
                            if (history.pushState) {
                                history.pushState(
                                    null,
                                    null,
                                    this.href(member)
                                );
                            } else {
                                location.hash = this.href(member);
                            }

                            e.preventDefault();
                        }}
                    >
                        <a
                            role="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#${member.name}`}
                            aria-expanded="false"
                            aria-controls="addcontrol"
                            className="collapsed"
                        >
                            <span className="p-2 h6 text-secondary d-block m-0">
                                {member.name}
                                {member.kind === 'function' && (
                                    <span
                                        className="text-dark"
                                        dangerouslySetInnerHTML={{
                                            __html: `${formatters.parameters(
                                                member,
                                                true
                                            )}`
                                        }}
                                    />
                                )}
                                <span className="float-end collapse-arrow">
                                    {' '}
                                    <svg
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                    >
                                        <use href="/styles/style/icon/icon.svg#keyboard_arrow_down"></use>
                                    </svg>
                                </span>
                            </span>
                        </a>
                    </div>
                </React.Fragment>

                {
                    <div
                        id={member.name}
                        className="collapse"
                        aria-labelledby="addcontrol"
                        data-parent="#accordion"
                    >
                        <div className="card-body px-2">
                            <ApiItem
                                nested={true}
                                location={this.props.location}
                                {...member}
                            />
                        </div>
                    </div>
                }
            </div>
        );
    }

    hashChange() {
        if (window.location.hash === this.href(this.props)) {
            this.setState({ disclosed: true });
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.closeAll !== this.props.closeAll) {
            if (this.props.closeAll && this.state.disclosed) {
                this.setState({ disclosed: false });
            }
        }
    }

    componentDidMount() {
        window.addEventListener('hashchange', this.hashChange);
        this.hashChange();
    }

    componentWillUnmount() {
        window.removeEventListener('hashchange', this.hashChange);
    }
}

ApiItemMember.propTypes = {
    namespace: PropTypes.string,
    name: PropTypes.string,
    kind: PropTypes.string,
    location: PropTypes.object,
    closeAll: PropTypes.bool,
    headingLevel: PropTypes.number
};

export default ApiItemMember;
