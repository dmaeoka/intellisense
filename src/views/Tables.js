import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Components
import CardTable from "components/CardTable";
import CardLineChart from "components/CardLineChart";
import CardLineChartD3 from "components/CardLineChartD3";

// Actions
import { fetchReferencia } from "actions/index";

class Tables extends React.Component {
	componentDidMount() {
		this.props.fetchReferencia();
	}

	render() {
		return (
			<>
				<div className="flex flex-wrap mt-4">
					<div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
						<CardLineChartD3
							title="TK1 Chart using D3.js"
							data={this.props.items} pending={this.props.pending}
							error={this.props.error}
						/>
						<CardLineChart
							title="TK1 Chart using Chart.js"
							data={this.props.items}
							pending={this.props.pending}
							error={this.props.error}
						/>
					</div>
					<div className="w-full xl:w-4/12 px-4">
						<CardTable
							title="Current TK1"
							data={this.props.items}
							pending={this.props.pending}
							error={this.props.error}
						/>
					</div>
				</div>
			</>
		);
	}
}

Tables.defaultProps = {
	items: [],
	pending: true,
	error: null
};

Tables.propTypes = {
	fetchReferencia: PropTypes.func.isRequired,
	items: PropTypes.array.isRequired,
	pending: PropTypes.bool.isRequired,
	error: PropTypes.any
};

const mapStateToProps = (state) => ({
	items: state.items.items,
	pending: state.items.pending,
	error: state.items.error,
});

export default connect(mapStateToProps, { fetchReferencia })(Tables);
