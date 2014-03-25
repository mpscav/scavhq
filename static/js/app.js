/** @jsx React.DOM */
var ItemList = React.createClass({
	getInitialState: function() {
		return { 
      items: [],
      filters: { mode: "All", text: "" },
      sort: { column: "num", order: "asc" }
    };
	},

	componentWillMount: function() {
    this.loadData(this.props.source);
  },

  loadData: function(source) {
    if (!source) return;

    $.get(source).done(function(data) {
      this.setState({ items: data });
    }.bind(this)).fail(function(error, a, b) {
      console.log("Error loading JSON");
    });
	},

  filterModeHandler: function(e) {
    console.log(e);
    if (e.type === "click") {
      this.setState({filters: {mode: e.target.text, text: this.state.filters.text}});
    } else if (e.type === "input") {
      this.setState({filters: {mode: this.state.filters.mode, text: e.target.value}});
    }
  },

  render: function() {
    return (
      <div>
        <ItemTableHeader />
        <ItemTableOptions filters={this.state.filters} handler={this.filterModeHandler} />
        <div className="row table-container">
          <div className="table-header-background"> </div>
          <div className="table-container-inner">
            <ItemTable items={this.state.items} filters={this.state.filters} sort={this.state.sort} />
          </div>
        </div>
      </div>
    )
  }
});

var ItemTableHeader = React.createClass({
  render: function() {
    return (
      <div className="row table-header">
        <div className="large-6 columns table-heading">
          <h2>Item List</h2>
        </div>

        <div className="large-6 columns table-controls">
          <button className="button tiny">Button</button>
          <button className="button tiny">Button</button>
          <button className="button tiny">Button</button>
        </div>
      </div>
    );
  }
});

var ItemTableOptions = React.createClass({
  render: function() {
    return (
      <div className="row table-options">
        <div className="large-6 columns table-filter">
          <ItemTableFilters filterMode={this.props.filters.mode} handler={this.props.handler} />
        </div>

        <div className="large-6 columns table-search">
          <input type="text" placeholder="Search..." onChange={this.props.handler} />
        </div>
      </div>
    );
  }
});

var ItemTableFilters = React.createClass({
  render: function() {
    var allClass = (this.props.filterMode === "All") ? "active" : ""
    var casualClass = (this.props.filterMode === "Casual") ? "active" : ""
    var urgentClass = (this.props.filterMode === "Urgent") ? "active" : ""

    return (
      <dl className="sub-nav">
        <dt>Filter:</dt>
        <dd className={allClass}><a onClick={this.props.handler}>All</a></dd>
        <dd className={casualClass}><a onClick={this.props.handler}>Casual</a></dd>
        <dd className={urgentClass}><a onClick={this.props.handler}>Urgent</a></dd>
      </dl>
    );
  }
});

var ItemTable = React.createClass({
	render: function() {
    var rows = [];

    var filterMode = this.props.filters.mode;
    var filteredItems = _.filter(this.props.items, function(item) {
      if (filterMode === "Casual") {
        if (item.status !== "complete" && _.contains(item.tags, "Casual")) return true;
        return false;
      } else if (filterMode === "Urgent") {
        if (item.status === "urgent") return true;
        return false;
      }

      return true;
    });

    var searchText = this.props.filters.text;
    var searchedItems = _.filter(filteredItems, function(item) {
      if (searchText === "") return true;

      return _.some(_.values(item), function(x) {
        return x.toString().toLowerCase().indexOf(searchText.toLowerCase()) > -1
      });
    });

    var sortedItems = _.sortBy(searchedItems, this.props.sort.column);
    if (this.props.sort.order === "desc") sortedItems.reverse();    

    sortedItems.forEach(function(item, idx) {
      rows.push(
        <tr key={idx}>
          <td>{item.num}</td>
          <td>{item.page}</td>
          <td>{item.leader}</td>
          <td>{item.name}</td>
          <td>Construction, Music</td>
          <td>Sun @ 12:00pm</td>
          <td>Not Started</td>
        </tr>
      )
    }.bind(this));

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
        <tbody>
          { rows }
        </tbody>
			</table>
		);
	}
});

React.renderComponent(
	<ItemList source="/api/items" />,
  document.getElementById('items')
);
