import React from 'react';
import CircularProgress from 'material-ui/lib/circular-progress';
import colors from '../../../config/colors.json';
import HackerNewsStory from '../HackerNews/HackerNewsStory';
import GitHubRepo from '../GitHub/GitHubRepo';
import ProductHuntItem from '../ProductHunt/ProductHuntItem';

class NewsList extends React.Component {

    constructor () {
        super();

        this.state = {
            data: [],
            loaded: false,
        };
    }

    componentDidMount () {
        this.props.getItems((data) => {
            this.setState({
                data: data,
                loaded: true,
            });
        });
    }

    render () {
        if (!this.state.loaded) {
            return (
                <div style={{margin: "45px"}}>
                    <CircularProgress color={colors.brandPrimary} />
                </div>
            )
        }

        if (!this.state.data.length) {
            return (
                <div>Oops, we were unable to load the stories :(</div>
            )
        }

        return (
            <div className={this.props.className}>
                {
                    this.state.data.map(item => {
                        if (this.props.source == 'HackerNews') {
                            return (
                                <HackerNewsStory
                                    key={item.id}
                                    story={item}
                                />
                            )
                        }
                        if (this.props.source == 'GitHub') {
                            return (
                                <GitHubRepo
                                    key={item.url}
                                    repo={item}
                                />
                            )
                        }
                        if (this.props.source == 'ProductHunt') {
                            return (
                                <ProductHuntItem
                                    key={item.id}
                                    product={item}
                                />
                            )
                        }
                    })
                }
            </div>
        )
    }

};

NewsList.propsTypes = {
    source: React.PropTypes.string.isRequired,
    getItems: React.PropTypes.object.isRequired,
};

export default NewsList;
