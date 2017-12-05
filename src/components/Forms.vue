<template>
	<div class="md w-5/6">
		<p class="text-2xl font-sans">Forms</p>
		<div class="ui compact menu">
			<a class="item">
				<i class="plus icon"></i>
				New
			</a>
		</div>
		<div class="my-2 bg-white p-2 shadow-md rounded">
			<div class="ui segment">
				<div class="ui relaxed divided list">
					<div class="item">
						<div class="right floated content">
							<router-link :to="{name: 'ViewForm', params: { id: 3 }}">
								<a class="ui button">
									<i class="icon eye"></i>Preview</a>
							</router-link>
							<router-link :to="{name: 'FormEdit', params: { id: 3 }}">
								<a class="ui button">
									<i class="icon compose"></i>Edit
								</a>
							</router-link>
							<router-link :to="{name: 'DataForm', params: { id: 3 }}">
							<a class="ui button">
								<i class="icon table"></i>Data</a>
							</router-link>
							<a class="ui button">
								<i class="icon remove"></i>Delete</a>
						</div>
						<div class="content">
							<div class="header">Form 1</div>
							<p class="my-1">Short description</p>
							<p class="text-sm text-grey">Updated 2 days ago</p>
						</div>
					</div>
					<div class="item">
						<div class="right floated content">
							<router-link :to="{name: 'ViewForm', params: { id: 2 }}">
								<a class="ui button">
									<i class="icon eye"></i>Preview</a>
							</router-link>
							<a class="ui button">
								<i class="icon compose"></i>Edit</a>
							<a class="ui button">
								<i class="icon table"></i>Data</a>
							<a class="ui button">
								<i class="icon remove"></i>Delete</a>
						</div>
						<div class="content">
							<div class="header">Form 2</div>
							<p class="my-1">Short description</p>
							<p class="text-sm text-grey">Updated 2 days ago</p>
						</div>
					</div>
					<div class="item">
						<div class="right floated content">
							<router-link :to="{name: 'ViewForm', params: { id: 1 }}">
								<a class="ui button">
									<i class="icon eye"></i>Preview</a>
							</router-link>
							<a class="ui button">
								<i class="icon compose"></i>Edit</a>
							<a class="ui button">
								<i class="icon table"></i>Data</a>
							<a class="ui button">
								<i class="icon remove"></i>Delete</a>
						</div>
						<div class="content">
							<div class="header">Form 3</div>
							<p class="my-1">Short description</p>
							<p class="text-sm text-grey">Updated 2 days ago</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>