describe('support for Circle elements', function () {
	var map, div, clock;
	beforeEach(function () {
		clock = sinon.useFakeTimers();

		div = document.createElement('div');
		div.style.width = '200px';
		div.style.height = '200px';
		document.body.appendChild(div);

		map = L.map(div, { maxZoom: 18 });

		map.fitBounds(new L.LatLngBounds([
			[1, 1],
			[2, 2]
		]));
	});
	afterEach(function () {
		clock.restore();
		document.body.removeChild(div);
	});

	it('appears when added to the group before the group is added to the map', function () {

		var group = new L.MarkerClusterGroup();
		var marker = new L.Circle([1.5, 1.5], 200);

		group.addLayer(marker);
		map.addLayer(group);

		expect(marker._container).to.not.be(undefined);
		expect(marker._container.parentNode).to.be(map._pathRoot);

		clock.tick(1000);
	});
	it('appears when added to the group after the group is added to the map', function () {

		var group = new L.MarkerClusterGroup();
		var marker = new L.Circle([1.5, 1.5], 200);

		group.addLayer(marker);
		map.addLayer(group);

		expect(marker._container).to.not.be(undefined);
		expect(marker._container.parentNode).to.be(map._pathRoot);

		clock.tick(1000);
	});
	it('appears animated when added to the group after the group is added to the map', function () {

		var group = new L.MarkerClusterGroup({ animateAddingMarkers: true });
		var marker = new L.Circle([1.5, 1.5], 200);
		var marker2 = new L.Circle([1.5, 1.5], 200);

		map.addLayer(group);
		group.addLayer(marker);
		group.addLayer(marker2);

		expect(marker._container.parentNode).to.be(map._pathRoot);
		expect(marker2._container.parentNode).to.be(map._pathRoot);

		clock.tick(1000);
	});


	it('creates a cluster when 2 overlapping markers are added before the group is added to the map', function () {

		var group = new L.MarkerClusterGroup();
		var marker = new L.Circle([1.5, 1.5], 200);
		var marker2 = new L.Circle([1.5, 1.5], 200);

		group.addLayers([marker, marker2]);
		map.addLayer(group);

		expect(marker._container).to.be(undefined);
		expect(marker2._container).to.be(undefined);

		expect(map._panes.markerPane.childNodes.length).to.be(1);

		clock.tick(1000);
	});
	it('creates a cluster when 2 overlapping markers are added after the group is added to the map', function () {

		var group = new L.MarkerClusterGroup();
		var marker = new L.Circle([1.5, 1.5], 200);
		var marker2 = new L.Circle([1.5, 1.5], 200);

		map.addLayer(group);
		group.addLayer(marker);
		group.addLayer(marker2);

		expect(marker._container.parentNode).to.be(null); //Removed then re-added, so null
		expect(marker2._container).to.be(undefined);

		expect(map._panes.markerPane.childNodes.length).to.be(1);

		clock.tick(1000);
	});

	it('disappears when removed from the group', function () {

		var group = new L.MarkerClusterGroup();
		var marker = new L.Circle([1.5, 1.5], 200);

		group.addLayer(marker);
		map.addLayer(group);

		expect(marker._container).to.not.be(undefined);
		expect(marker._container.parentNode).to.be(map._pathRoot);

		group.removeLayer(marker);

		expect(marker._container.parentNode).to.be(null);

		clock.tick(1000);
	});

});
