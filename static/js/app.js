/** @jsx React.DOM */
var Item = React.createClass({
	render: function() {
		return (
			<tr className="comment">
				<td>{this.props.item.num}</td>
				<td>{this.props.item.page}</td>
				<td>{this.props.item.leader}</td>
				<td>{this.props.item.name}</td>
				<td>Construction, Music</td>
				<td>Sun @ 12:00pm</td>
				<td>Not Started</td>
			</tr>
		);
	}
});
	

var ItemList = React.createClass({
	render: function() {
		var itemNodes = this.props.items.map(function (item, index) {
			return <Item key={index} item={item} />;
		});

		return <tbody className="itemList">{itemNodes}</tbody>;
	}
});

var ItemTable = React.createClass({
	getInitialState: function() {
		return {items: []};
	},

	componentWillMount: function() {
		$.ajax({
			url: this.props.source,
			success: function(items) {
				this.setState({items: items});
			}.bind(this)
		});
	},

	render: function() {
		return (
			<table id="items" className="itemsTable">
				<thead>
					<tr>
						<th><div className="th-inner">#</div></th>
						<th><div className="th-inner">P</div></th>
						<th><div className="th-inner">Leader</div></th>
						<th><div className="th-inner">Description</div></th>
						<th><div className="th-inner">Tags</div></th>
						<th><div className="th-inner">Due Date</div></th>
						<th><div className="th-inner">Status</div></th>
					</tr>
				</thead>
				<ItemList items={this.state.items} />
			</table>
		);
	}
});

React.renderComponent(
	<ItemTable source="/api/items" />,
	document.getElementById('item-table-container')
);
